import React, { useEffect, useState } from 'react'
import "./PlansScreen.scss"
import db from '../../services/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from "@stripe/stripe-js"
import Loading from '../loading/Loading';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser)

    useEffect(() => {
        db.collection("Clientes").doc(user?.uid).collection("subscriptions").get().then((query) => {
            query.forEach(async (subscriptions) => {
                setSubscription({
                    role: subscriptions.data().role,
                    current_period_end: subscriptions.data().current_period_end.seconds,
                    current_period_start: subscriptions.data().current_period_start.seconds,
                })
            })
        })
    }, [user?.uid])

    useEffect(() => {
        db.collection("Produtos")
            .where("active", "==", true)
            .get().then(query => {
                const products = {};
                query.forEach(async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection("prices").get();
                    priceSnap.docs.forEach(doc => {
                        products[productDoc.id].prices = {
                            priceId: doc.id,
                            priceData: doc.data()
                        }
                    })
                })
                setProducts(products);
            });
    }, []);


    const loadCheckout = async (priceId) => {
        setLoading(true)
        const docRef = await db.collection("Clientes").doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: "https://netflix-2-0-three.vercel.app/homeScreen",
            cancel_url: "https://netflix-2-0-three.vercel.app/homeScreen",
        });

        docRef.onSnapshot(async doc => {
            const { error, sessionId } = doc.data()

            if (error) {
                setLoading(false)
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51MUcYvCOnDtyMzvob1MOsrdP5Ow7manRvPO1pJAkVZE0ExagbDBVTxRDlST04UfCQaHSAscwFK4pWHghHSkSMap400iOum7Xt6");
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

    return (
        <div className='plansScreen'>
            {subscription && (
                <p className='plansScreen__date'>Data de renovação: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
            )}
            {loading && <Loading />}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.includes(subscription?.role);

                return (
                    <div key={productId} className={`plansScreen__plan ${isCurrentPackage && "plansScreen__currentPlan"}`}>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>{isCurrentPackage ? "Pacote atual" : "Inscreva-se"}</button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen

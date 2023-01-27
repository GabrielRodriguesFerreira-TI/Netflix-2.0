import React, { useEffect, useState } from 'react'
import "./PlansScreen.scss"
import db from '../../services/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from "@stripe/stripe-js"

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser)

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
        const docRef = await db.collection("Clientes").doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async doc => {
            const { error, sessionId } = doc.data()

            if (error) {
                alert(`An error occured: ${error.message}`)
            }

            if (sessionId) {
                const stripe = await loadStripe("pk_test_51MUcYvCOnDtyMzvob1MOsrdP5Ow7manRvPO1pJAkVZE0ExagbDBVTxRDlST04UfCQaHSAscwFK4pWHghHSkSMap400iOum7Xt6");
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

    return (
        <div>
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div key={productId} className='plansScreen__plan'>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>

                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Inscreva-se</button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen

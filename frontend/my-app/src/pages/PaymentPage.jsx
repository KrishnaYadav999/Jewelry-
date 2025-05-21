import PaymentButton from '../components/PaymentButton';

const PaymentPage = () => {
    return (
        <div>
            <h1>Make a Payment</h1>
            <PaymentButton amount={500} />
        </div>
    );
};

export default PaymentPage;

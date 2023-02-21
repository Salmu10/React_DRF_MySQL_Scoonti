import './SpinnerLoading.scss';

export default function SpinnerLoading() {
    return (
        <div className="spinner">
            <div className="ring">
                Loading
                <span></span>
            </div>
        </div>
    )
}
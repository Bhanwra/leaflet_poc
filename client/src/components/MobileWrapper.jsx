const MobileWrapper = (props) => {

    return (
        <div className="md:m-auto md:w-96 mobile-wrapper">
            {props.children}
        </div>
    )

}

export default MobileWrapper
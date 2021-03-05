const MobileWrapper = (props) => {

    return (
        <div className="md:m-auto md:w-96 mobile-wrapper bg-gray-50">
            {props.children}
        </div>
    )

}

export default MobileWrapper
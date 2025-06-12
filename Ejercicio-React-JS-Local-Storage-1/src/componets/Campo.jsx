const Campo = ({id, iconName, inputType, placeHolder}) => {
    return (
        <div className="input-group mb-3">
            <span className="input-group-text">
                <i className={iconName} />
            </span>
            <input className="form-control" type={inputType} placeholder={placeHolder} id={id}/>
        </div>
    )
}

export default Campo;
import { PropsModal } from "../types";

const Modal = ({
    activeModal,
    formData, 
    collectFormData, 
    sentData, 
    setActiveModal,
    clearForm,
    text}: PropsModal) => {

    console.log(formData, 'JJJJ')
    return <div className={activeModal ? 'modal-active' : 'modal-close'}>
        <div className="modal_content">
            <form
                action="post"
                className="form"
            >
                <div className="form-inputs">
                    <p>
                        {text.description}
                    </p>
                    <p>
                        Заполните все поля для создания новой номенклатуры.
                    </p>
                    <label>
                        Название
                        <input
                            type='text'
                            value={formData.name}
                            onChange={(e) => collectFormData(e.target.value, 'name')}
                        />
                    </label>
                    <label>
                        Единицы измерения
                        <input
                            type='text'
                            value={formData.measurement_units}
                            onChange={(e) => collectFormData(e.target.value, 'measurement_units')}
                        />
                    </label>
                    <label>
                        Артикул/код
                        <input
                            type='text'
                            value={formData.code}
                            onChange={(e) => collectFormData(e.target.value, 'code')}
                        />
                    </label>
                    <label>
                        Описание
                        <textarea
                            rows={7}
                            cols={25}
                            value={formData.description}
                            onChange={(e) => collectFormData(e.target.value, 'description')}
                        />
                    </label>
                </div>
                <div className="wrapper-buttons">
                    <button
                        className="button-post"
                        type='submit'
                        onClick={() => {
                            sentData(text.id);
                            setActiveModal(!activeModal);
                            clearForm();
                        }}
                        >
                        Потдвердить
                    </button>
                    <button
                        className="button-close"
                            onClick={() => {
                                setActiveModal(!activeModal);
                                clearForm();
                            }}
                        >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default Modal;
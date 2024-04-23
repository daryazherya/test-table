import { ChangeEvent, useEffect, useState } from 'react';
import { fetchDataForPage } from './api/fetchDataForPage';
import './App.css';
import Modal from './components/Modal';
import { postData } from './api/postData';
import { PAGE_SIZES } from './utils/constants';
import { FormData, Item, Data } from './types';
import { patchData } from './api/patchData';




function App() {
    const [data, setData] = useState<Data>({
        result: [],
        total: 0
    });
    const [dataTable, setDataTable] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [inputValue, setInputValue] = useState('');
    const [activeModal, setActiveModal] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        code: '',
        measurement_units: ''
    });

    const [id, setId] = useState('');

    useEffect(() => {
        fetchDataForPage(page, pageSize).then((dataTools) => {
            setData(dataTools)
            setDataTable(dataTools.result)
        })
    }, [page, pageSize]);

    const increasePage = () => {
        setPage((page) => page + 1);
    };
    const decreasePage = () => {
        setPage((page) => page - 1);
    };
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    };
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const findInsideTable = (value: string) => {
        const filteredData = data.result.filter(item => item.name.startsWith(value.toLowerCase()));
        if (filteredData.length !== 0) {
            return filteredData
        } else {
            return data.result
        }
    };

    const sentFormData = (id: string = '') => {
        if (id === '' && Object.values(formData).every(item => item !== '')) {
            postData(formData)
        } else if (id) {
            patchData(formData, id)
        } else {
            alert('Заполните все поля')
        }
    }
    const collectFormData = (value: string, key: string) => {
        setFormData(prev => {
            return { ...prev, [key]: value }
        })
    }
    const findItem = (id: string) => {
        return data.result.find(item => item.id === id);
    }
    const clearForm = () => {
        setFormData({
            name: '',
            description: '',
            code: '',
            measurement_units: ''
        })
    }

    return (
        <div className='wrapper-table'>
            <header className='header'>
                <div className='header__wrapper-title'>
                    <p className='header__title'>
                        Номенклатура
                    </p>
                    <button className='badge'>
                        {data.total} ед.
                    </button>
                </div>
                <div className='search'>
                    <input
                        type='text'
                        className='search__input'
                        name={inputValue}
                        onChange={(e) => changeInputValue(e)}
                        placeholder='Поиск по названию...'
                    />
                    <button
                        className='search__text'
                        onClick={() => setDataTable(findInsideTable(inputValue))}
                    >
                        Поиск
                    </button>
                    <button
                        className='search__button-position button'
                        onClick={() => {
                            setActiveModal(true)
                        }}
                    >+ Новая Позиция</button>
                </div>
            </header>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Ед. измерения</th>
                        <th>Артикул/код</th>
                    </tr>
                </thead>
                <tbody >
                    {dataTable && dataTable.map((item) => {
                        return <tr key={item.id}>
                            <td >{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.measurement_units}</td>
                            <td>{item.code}</td>
                            <td>
                                <button
                                    className='button-table'
                                    onClick={() => {
                                        setActiveModal(!activeModal);
                                        const result = findItem(item.id);
                                        if (result) {
                                            setId(result.id);
                                            setFormData((prev) => {
                                                return {
                                                    ...prev,
                                                    name: result.name,
                                                    description: result.description,
                                                    code: result.code,
                                                    measurement_units: result.measurement_units
                                                }
                                            })
                                        }
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className='wrapper-footer'>
                <div className="wrapper-footer__pagination">
                    <button
                        className='button-skip'
                        onClick={decreasePage}
                        disabled={page === 1}
                    >
                        Назад
                    </button>
                    <button
                        className='button-skip'
                        onClick={increasePage}
                    >
                        Вперед
                    </button>
                </div>
                <label>
                    Показывать по:
                    <select
                        className='select'
                        onChange={handleChange}
                        value={pageSize}
                    >
                        {PAGE_SIZES.map((number, id) => {
                            return <option key={id}>{number}</option>
                        })}
                    </select>
                </label>
            </div>
            {activeModal && formData.name === '' && <Modal
                options={{ description: 'Новая позиция', id: '' }}
                activeModal={activeModal}
                formData={formData}
                collectFormData={collectFormData}
                sentData={sentFormData}
                setActiveModal={setActiveModal}
                clearForm={clearForm}
            />}
            {activeModal && formData.name !== '' && <Modal
                options={{ description: 'Редактирование позиции', id }}
                activeModal={activeModal}
                formData={formData}
                collectFormData={collectFormData}
                sentData={sentFormData}
                setActiveModal={setActiveModal}
                clearForm={clearForm}
            />}
        </div>
    )
}

export default App

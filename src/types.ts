export interface FormData {
    name: string;
    description: string;
    code: string;
    measurement_units: string;
}

export interface Item {
    id: string;
    name: string;
    description: string;
    code: string;
    measurement_units: string;
    
}

export interface Data {
    total: number;
    result: Item[];
}

export interface PropsModal {
    activeModal: boolean;
    formData: FormData;
    collectFormData: (form: string, value: string) => void;
    sentData: (id?: string ) => void;
    setActiveModal: (value: boolean) => void;
    text: {
        description: string;
        id: string
    };
    clearForm: () => void;
}
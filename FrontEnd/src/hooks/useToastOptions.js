const useToastOptions = () => {

    // Options for Toast Notify
    const options = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    };

    return options;
}

export default useToastOptions;
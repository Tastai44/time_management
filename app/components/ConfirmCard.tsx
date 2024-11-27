import React from "react";

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    isOpen: boolean;
}

const ConfirmCard = (props: IProps) => {
    return (
        <>
            {props.isOpen ? (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4`}>
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 text-center">
                            {props.message}
                        </h2>
                        <div className="flex justify-end mt-6 gap-1">
                            <button
                                onClick={props.onCancel}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={props.onConfirm}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all duration-300"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

        </>

    );
};

export default ConfirmCard;

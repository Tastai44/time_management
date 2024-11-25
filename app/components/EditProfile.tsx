import React from 'react';

interface IProps {
    name: string;
    email: string;
}

export default function EditProfile(prpos: IProps) {
    return (
        <div className='flex flex-col gap-1 w-70%'>
            <div>EditProfile</div>
            <input type="text" defaultValue={prpos.name} />
            <input type="text" defaultValue={prpos.email} />
            <div className='flex justify-between'>
                <button>Cancel</button><button>Edit</button>
            </div>
        </div>
    );
}

import React from 'react';
import { T_ROOT_REDUCER } from '@/modules';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '@/modules/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

interface I_PROPS {
    onSelect: (id: string) => void;
}

const Favorite: React.FC<I_PROPS> = ({ onSelect }) => {
    const dispatch = useDispatch();
    const list = useSelector((state: T_ROOT_REDUCER) => state.search.favorites);

    const handleDelete = (value: string) => {
        dispatch(removeFavorite(value));
    };

    return (
        <ul>
            {list.map((item) => (
                <li>
                    <span
                        className="recommand__id"
                        onClick={() => {
                            onSelect(item);
                        }}
                    >
                        {item}
                    </span>
                    <span
                        className="recommand__btn"
                        onClick={() => {
                            handleDelete(item);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default React.memo(Favorite);

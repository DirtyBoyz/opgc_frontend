import React, { useEffect } from 'react';
import './style.css';
import { CONTRI_COLUMNS } from './constants';
import { T_ROOT_REDUCER } from '@/modules';
import { actions } from '@/modules';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@/components/common/Table';
import Search from './Search';

interface I_PROPS {}

const MainPage: React.FC<I_PROPS> = () => {
    const { getRanks } = actions.rank.ContinousCommit;
    const dispatch = useDispatch();
    const {
        root: { searchId },
        continuousCommit: { ranks },
    } = useSelector((state: T_ROOT_REDUCER) => state.rank);

    useEffect(() => {
        dispatch(getRanks(searchId));
    }, []);

    return (
        <div id="main-page">
            <img
                className="main-page__logo"
                src="/assets/imgs/search/index-logo.png"
            />
            <section>
                <Search />
            </section>

            {/* 1일 1커밋 */}
            <section className="main__rank">
                <h1>1일 1커밋을 실천하는 개발자 랭킹 🌱</h1>
                <br />
                <div>좀 더 다양한 랭킹은 상단 Rank 탭을 이용하세요.</div>
                <div className="ranking__content">
                    <Table columns={CONTRI_COLUMNS} data={ranks} />
                </div>
            </section>
        </div>
    );
};

export default React.memo(MainPage);

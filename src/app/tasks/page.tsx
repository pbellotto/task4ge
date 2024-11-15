/*
 * Copyright (C) 2024 pbellotto (pedro.augusto.bellotto@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';
import styles from './page.module.css'
import TaskService from '../services/TaskService';
import { Suspense } from 'react';
import IGetAllResponse from '../dto/tasks/IGetAllResponse';

async function getTasks(accessToken: string): Promise<IGetAllResponse[] | undefined> {
    try {
        return await TaskService.GetAll(accessToken);
    } catch (err: any) {
        console.error(err.message);
    }
}

async function TaskAddBar() {
    return (
        <div className='row text-center'>
            <div className={styles['btn-edit-delete']}>
                <a type="button" className='btn' title="Add" data-bs-toggle="modal" data-bs-target="#product-add-modal">
                    <i className="bi-plus-circle" style={{ paddingRight: 3 }} />
                    <span>Add Product</span>
                </a>
            </div>
        </div>
    );
}

async function TaskGridHeader() {
    return (
        <div className="row row-cols-6">
            <div className="col-md-4">
                <b>Name</b>
            </div>
            <div className="col-md-4">
                <b>Ctg.</b>
            </div>
            <div className="col-md-1 text-end">
                <b>Proof</b>
            </div>
            <div className="col-md-1 text-end">
                <b>Qtd.</b>
            </div>
            <div className="col-md-1 text-end">
                <b>Price</b>
            </div>
            <div className="col-md-auto">
            </div>
        </div>
    );
}

async function TaskGrid({ accessToken }: { accessToken: string | undefined }) {
    const tasks: IGetAllResponse[] = await getTasks(accessToken!) || [];
    return (
        tasks.map((task) => (
            <div className="row row-cols-6" key={task.Id}>
                <div className="col-md-4 text-wrap">
                    <span>{task.Name}</span>
                </div>
                <div className="col-md-auto">
                    <div className={styles['btn-edit-delete']}>
                        <button type="button" className="btn btn-primary btn-sm" title="Edit"><i className="bi-pen"></i></button>
                    </div>
                    <div className={styles['btn-edit-delete']}>
                        <button type="button" className="btn btn-danger btn-sm" title="Delete"><i aria-hidden className="bi-x-lg"></i></button>
                    </div>
                </div>
            </div>))
    );
}

export default withPageAuthRequired(
    async function Tasks() {
        const { accessToken } = await getAccessToken();

        return (
            <main className={styles.main}>
                <div className="container">
                    <TaskAddBar />
                    <TaskGridHeader />
                    <Suspense fallback={<div>Loading...</div>}>
                        <TaskGrid accessToken={accessToken} />
                    </Suspense>
                </div>
            </main>
        );
    }, { returnTo: '/tasks' }
);
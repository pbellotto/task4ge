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

'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TaskService from '../../services/TaskService';
import IGetResponse from '../../dto/tasks/IGetResponse';
import useSWR from 'swr';
import React from 'react';
import apiClient from '@/app/utils/api-client';

async function fetcher(id: any): Promise<IGetResponse | undefined> {
    try {
        const response = await apiClient.get(`/Task/${id}`);
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export default withPageAuthRequired(
    function Task({ params }: any) {
        const { id }: any = React.use(params)
        const { data, error } = useSWR(id, fetcher)
        if (!data) {
            return (
                <main>
                    <div className='container mx-auto w-full max-w-screen-xl px-4 py-60'>
                        <p className='text-gray-800 text-2xl text-center font-extrabold'>TASK NOT FOUND</p>
                    </div>
                </main>
            );
        }

        return (
            <main>
                <div className='container mx-auto w-full max-w-screen-xl px-4 py-2'>
                    {data?.Name}
                </div>
            </main>
        );
    }
);
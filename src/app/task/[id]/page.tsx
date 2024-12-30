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
import IGetResponse from '../../dto/tasks/IGetResponse';
import useSWR from 'swr';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useForm } from 'react-hook-form';

const fetcher = async ([url, accessToken]: string[]): Promise<IGetResponse | undefined> => {
    if (!accessToken) {
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    } catch (error: any) {
        if (error['cause']?.code === 'ECONNREFUSED') {
            throw new Error("Connection refused by server.");
        }

        throw error;
    }
}

export default withPageAuthRequired(
    function Task({ params }: any) {
        const [accessToken, setAccessToken] = useState<string>('');
        useEffect(() => {
            const getAccessToken = async () => {
                const response = await fetch('/api/getToken');
                const data = await response.json();
                setAccessToken(data.token);
            };

            getAccessToken();
        }, [accessToken]);

        const { data, isLoading } = useSWR([`${process.env.NEXT_PUBLIC_SERVER_BASE_URI}/Task/${params?.id}`, accessToken], fetcher)
        const { register, handleSubmit, reset } = useForm();
        useEffect(() => {
            if (data) {
                reset({
                    Name: data.Name,
                    Description: data.Description
                });
            }
        }, [data, reset]);
        const onSubmit = (formData: any) => {
            // Send data to server
        };


        if (!accessToken || isLoading) {
            return <Loading />;
        }

        if (!data) {
            return <div>Error on data loading!</div>;
        }

        return (
            <main>
                <div className='container mx-auto w-full max-w-screen-xl px-4 py-2'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        {...register("Name")}
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm/6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="description"
                                        {...register("Description")}
                                        name="description"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm/6" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
);
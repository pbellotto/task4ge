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
        const [formData, setFormData] = useState({ Description: data?.Description });
        if (!accessToken || !data || isLoading) {
            return <Loading />;
        }

        return (
            <main>
                <div className='container mx-auto w-full max-w-screen-xl px-4 py-2'>
                    {formData?.Description}
                </div>
            </main>
        );
    }
);
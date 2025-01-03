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
import IGetAllResponse from '../dto/tasks/IGetAllResponse';
import Link from 'next/link';

const fetcher = async (accessToken: string): Promise<IGetAllResponse[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URI}/Task/GetAll`, {
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
    async function Tasks() {
        const { accessToken } = await getAccessToken();
        const data = await fetcher(accessToken!);
        return (
            <main>
                <div className='container mx-auto w-full max-w-screen-xl px-4 py-2'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        {
                            data!.map((task) => (
                                <Link href={`/task/${task.Id}`} key={task.Id}>
                                    <div className='h-32 bg-[#017cc2] text-gray-50 font-medium rounded-lg border px-4 py-2'>
                                        <div className="px-1 py-2">
                                            <div className="text-lg font-bold mb-1 text-pretty line-clamp-1">
                                                {task.Name}
                                            </div>
                                            <p className='text-sm text-pretty line-clamp-3'>
                                                {task.Description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>))
                        }
                    </div>
                </div>
            </main>
        );
    }
);
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

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

export function Profile() {
    const { user } = useUser();
    const [formData, setFormData] = useState({ picture: user?.picture, nickname: user?.nickname, name: user?.name, email: user?.email });

    return (
        <main>
            <div className="container mx-auto w-full max-w-screen-xl px-4">
                <form>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <div className="flex items-center gap-x-3">
                                    <img
                                        alt=""
                                        src={formData.picture ?? ''}
                                        className="h-15 w-15 rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-800 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                        task4ge.com/
                                    </span>
                                    <input
                                        id="username"
                                        name="username"
                                        value={formData.nickname ?? ''}
                                        onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                                        type="text"
                                        placeholder="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name ?? ''}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        type="text"
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm/6"
                                        readOnly />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email ?? ''}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm/6"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default withPageAuthRequired(Profile);
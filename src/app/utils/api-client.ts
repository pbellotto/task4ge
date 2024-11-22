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

import { getAccessToken } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { redirect } from 'next/navigation';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URI,
    timeout: 3000,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(async (config) => {
    try {
        const { accessToken } = await getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    } catch (error) {
        throw error;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.error('Authentication error. Redirecting...');
            redirect('/api/auth/login');
        }

        return Promise.reject(error);
    }
);

export default apiClient;

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

import IGetAllResponse from '../dto/tasks/IGetAllResponse';
import IGetResponse from '../dto/tasks/IGetResponse';
import apiClient from '../utils/api-client';

class TaskService {
    public async get(id: string): Promise<IGetResponse> {
        try {
            const response = await apiClient.get(`/Task/${id}`);
            return response.data;
        } catch (error: any) {
            console.log(error)
            throw new Error(error);
        }
    }

    public async getAll(): Promise<IGetAllResponse[]> {
        try {
            const response = await apiClient.get('/Task/GetAll');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data);
        }
    }
}

const taskService: TaskService = new TaskService();
export default taskService;
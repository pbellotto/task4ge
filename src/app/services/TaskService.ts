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

import IErrorResponse from '../dto/common/IErrorResponse';
import IGetAllResponse from '../dto/tasks/IGetAllResponse';

class TaskService {
    public async GetAll(accessToken: string): Promise<IGetAllResponse[]> {
        const init: RequestInit = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            cache: 'default'
        };
        const response: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URI}/Task/GetAll`, init);
        if (!response.ok) {
            const error: IErrorResponse = await response.json();
            throw new Error(error.Detail);
        }

        return await response.json();
    }
}

const taskService: TaskService = new TaskService();
export default taskService;
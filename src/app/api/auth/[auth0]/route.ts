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

import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    async login(req: any, res: any) {
        try {
            return await handleLogin(req, res, {
                authorizationParams: {
                    audience: process.env.AUTH0_AUDIENCE
                }
            });
        } catch (error: any) {
            res.status(error.status || 400).end(error.message);
        }
    }
});
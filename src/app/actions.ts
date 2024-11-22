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

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createTask(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        todo: z.string().min(1),
    });
    const parse = schema.safeParse({
        todo: formData.get("todo"),
    });

    if (!parse.success) {
        return { message: "Failed to create todo" };
    }

    const data = parse.data;

    try {
        await sql`
        INSERT INTO todos (text)
        VALUES (${data.todo})
      `;

        revalidatePath("/");
        return { message: `Added todo ${data.todo}` };
    } catch (e) {
        return { message: "Failed to create todo" };
    }
}
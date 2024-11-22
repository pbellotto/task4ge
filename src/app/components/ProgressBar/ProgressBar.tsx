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

import styles from './ProgressBar.module.css';

export default function ProgressBar({ loading }: { loading: boolean }) {
    return (
        <div className={`w-full ${!loading ? 'hidden' : ''}`}>
            <div className='h-1 w-full bg-[#66C9FF] overflow-hidden'>
                <div className={`${styles.progress} w-full h-full bg-[#017cc2] ${styles['left-right']}`}></div>
            </div>
        </div>
    );
}
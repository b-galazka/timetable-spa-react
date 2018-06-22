import axios from 'axios';

import { apiBaseUrl } from '../json/urls';

export default axios.create({
    baseURL: apiBaseUrl
});
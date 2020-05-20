import axios, {AxiosResponse} from 'axios';
import Cookies from 'js-cookie';


type RequestParams = {
  path: string,
  method: 'get' | 'post',
  token?: string,
  params?: Object,
  header?: Object,
}

export async function request(request_params: RequestParams): Promise<AxiosResponse<any>> {
  const request_header = create_request_header(request_params)

  const res = await axios({
    url: `${process.env.API_URL}${request_params.path}`,
    method: request_params.method,
    headers: request_header,
    data: request_params.params ? request_params.params: null
  })

  return res;
}

export async function is_login(token: string | undefined): Promise<AxiosResponse<any> | false> {
  if (!token) {
    return false
  }
  // const authorization_header = { 'Authorization': `Bearer ${token}` }
  try {
    const request_params : RequestParams = {
      path: '/auth/',
      method: 'post',
      token: token
    }

    const res = await request(request_params);
    return res;
  } catch (err) {
    console.log('auth_err: ', err)
    return false
  }
}

export function is_token(): string | false {
  const token = Cookies.get('token')
  if (!token) {
    return false
  }
  return token
}

function create_request_header(request_params: RequestParams): Object {
  let request_header = {...request_params.header, ...{ "Content-Type": "application/json" }}

  if (request_params.token) request_header = {...request_header, ...{ 'Authorization': `Bearer ${request_params.token}` }}

  return request_header
}
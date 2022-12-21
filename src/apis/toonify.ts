import FormData from 'form-data';
import { AxiosWithRetry } from '@/apis';
import { AxiosError, isAxiosError } from 'axios';

type IModel = 'toonify' | 'toonifyplus' | 'emojify';

export const getToonifyImage = async (data: FormData, model: IModel) => {
  const options = {
    method: 'POST',
    url: `https://toonify.p.rapidapi.com/v0/${model ?? 'emojify'}`,
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_TOONIFY_API_KEY,
      'X-RapidAPI-Host': 'toonify.p.rapidapi.com',
      accept: 'application/json',
    },
    data,
  };

  try {
    const { data } = await AxiosWithRetry.request(options);
    return data.b64_encoded_output;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 400) {
        throw new Error('얼굴인식이 안됩니다');
      }
    }
  }
};

getToonifyImage.defaultProps = {
  model: 'emojify',
};

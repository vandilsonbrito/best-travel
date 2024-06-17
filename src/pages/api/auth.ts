// pages/api/auth.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface AmadeusTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  state: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const API_KEY = process.env.AMADEUS_API_KEY as string;
  const API_SECRET = process.env.AMADEUS_API_SECRET as string;

  const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', API_KEY);
  params.append('client_secret', API_SECRET);

  try {
    const response = await axios.post<AmadeusTokenResponse>(tokenUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const accessToken = response.data.access_token;
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error obtaining access token:', error);
    res.status(500).json({ error: 'Error obtaining access token' });
  }
}

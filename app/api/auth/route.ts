import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface AmadeusTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  state: string;
}

export async function GET(req: NextRequest) {
  const API_KEY = process.env.AMADEUS_API_KEY as string;
  const API_SECRET = process.env.AMADEUS_API_SECRET as string;
  const TOKEN_ACCESS_ENV = process.env.NEXT_PUBLIC_ROUTE_ACCESS_TOKEN as string;

  const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  const accessRouteToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!accessRouteToken || accessRouteToken !== TOKEN_ACCESS_ENV) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', API_KEY);
  params.append('client_secret', API_SECRET);

  try {
    const response = await axios.post<AmadeusTokenResponse>(tokenUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const accessToken = response.data.access_token;
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error obtaining access token:', error);
    return NextResponse.json({ error: 'Error obtaining access token' }, { status: 500 });
  }
}

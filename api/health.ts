export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Solo se permite GET'
    });
  }

  return res.status(200).json({
    status: 'ok',
    message: 'Wellkitt API Serverless está funcionando',
    timestamp: new Date().toISOString()
  });
}

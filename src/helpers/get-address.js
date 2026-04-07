export async function getAddress (ip = '8.8.8.8') {
    const response =  await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=7d1cbc42d12e4591b920b45b48d09c27&ip_address=${ip}`);
    return await response.json();
}

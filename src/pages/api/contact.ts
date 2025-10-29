import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();

    const GAS_URL =
      'https://script.google.com/macros/s/AKfycbxC0UifTl-8zEgcgt2RjvlJQ8Sns-4bqjYmsRyBvafrPOWK_xsY5n8Dnxgsuv0EcE5Q/exec';

    const gasResponse = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const gasResponseText = await gasResponse.text();

    let result;
    try {
      result = JSON.parse(gasResponseText);
    } catch {
      throw new Error(`GAS вернул невалидный JSON: ${gasResponseText}`);
    }

    return new Response(JSON.stringify(result), {
      status: gasResponse.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error:
          'Failed to process request: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

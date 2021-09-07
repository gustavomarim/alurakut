import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
    const TOKEN = "60d2eae9ad6b6681711943ee9cbd6d";

    if (request.method === 'POST') {

        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "967656", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/gustavomarim.png",
            // creatorSlug: "gustavomarim",
        });

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        });
        return;
    };

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    });
};
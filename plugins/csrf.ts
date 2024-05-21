export default async () => {
        const config = useRuntimeConfig()

        useFetch(`${config.public.apiBase}/csrf-token`, {
            method: 'GET',
            'Content-Type': 'Application/json',
            headers: {
                Authorization: `Bearer ${config.public.apiSecret}`,
            }
        }).then(async (response) => {
            // const data = await response.json();

            const csrfToken = response.csrfToken;

            if (csrfToken) {
                const metaTag = document.querySelector('meta[name="csrf-token"]');
                if (metaTag) {
                    metaTag.setAttribute('content', csrfToken);
                } else {
                    const newMetaTag = document.createElement('meta');
                    newMetaTag.name = 'csrf-token';
                    newMetaTag.content = csrfToken;
                    document.head.appendChild(newMetaTag);
                }
            }
        }).catch((error) => {
            console.error('Failed to fetch CSRF token', error);
        })
};
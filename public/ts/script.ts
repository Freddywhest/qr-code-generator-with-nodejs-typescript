const qrForm: HTMLFormElement | null = document.querySelector('#qrForm');
const urlInput: HTMLInputElement | null = document.querySelector('[name="url"]');
const sizeInput: HTMLSelectElement | null = document.querySelector('[name="size"]');
const button: HTMLButtonElement | null = document.querySelector('#button');
const resultDiv: HTMLDivElement | null = document.querySelector('.result-preview');
const feedback: HTMLDivElement | null = document.querySelector('.feedback');

type fetchResponse = {
    status: boolean,
    message?: string,
    data?: string
}

type requestBody = {
    url: string,
    size: string
}

function showResult(imgSrc?: string): string {
    return `
        <div class="qrImage">
            <img src="${imgSrc}" alt="" width="250" /> 
        </div>
        <div class="saveBtn">
            <a href="${imgSrc}" class="imageLink" download="${urlInput!.value.split('//')[1]}-qrcode.png">Save Image</a>
        </div>
    `;
}

async function fetchRequest(url: string): Promise<void> {
    const body: requestBody = {
        url: urlInput!.value,
        size: sizeInput!.value
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }
    const fetchRequest: Response = await fetch(url, options);
    const result: fetchResponse = await fetchRequest.json();
    if(!result.status){
        feedback!.innerHTML = `<p style="color: red">${result?.message}</p>`;
    }else{
        resultDiv!.innerHTML = `<img src="/img/loading-loader.gif" width="100" alt="">`;
        setTimeout(() => {
            resultDiv!.innerHTML = showResult(result?.data);
        }, 1500);
    }
    
}

qrForm?.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    fetchRequest('/generate');
});

urlInput?.addEventListener('input', (e: Event) => {
    feedback!.innerHTML = '';
});

sizeInput?.addEventListener('change', (e: Event) => {
    feedback!.innerHTML = '';
});

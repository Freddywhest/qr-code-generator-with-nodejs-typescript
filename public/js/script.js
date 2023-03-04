"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const qrForm = document.querySelector('#qrForm');
const urlInput = document.querySelector('[name="url"]');
const sizeInput = document.querySelector('[name="size"]');
const button = document.querySelector('#button');
const resultDiv = document.querySelector('.result-preview');
const feedback = document.querySelector('.feedback');
function showResult(imgSrc) {
    return `
        <div class="qrImage">
            <img src="${imgSrc}" alt="" width="250" /> 
        </div>
        <div class="saveBtn">
            <a href="${imgSrc}" class="imageLink" download="${urlInput.value.split('//')[1]}-qrcode.png">Save Image</a>
        </div>
    `;
}
function fetchRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            url: urlInput.value,
            size: sizeInput.value
        };
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        const fetchRequest = yield fetch(url, options);
        const result = yield fetchRequest.json();
        if (!result.status) {
            feedback.innerHTML = `<p style="color: red">${result === null || result === void 0 ? void 0 : result.message}</p>`;
        }
        else {
            resultDiv.innerHTML = `<img src="/img/loading-loader.gif" width="100" alt="">`;
            setTimeout(() => {
                resultDiv.innerHTML = showResult(result === null || result === void 0 ? void 0 : result.data);
            }, 1500);
        }
    });
}
qrForm === null || qrForm === void 0 ? void 0 : qrForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchRequest('/generate');
});
urlInput === null || urlInput === void 0 ? void 0 : urlInput.addEventListener('input', (e) => {
    feedback.innerHTML = '';
});
sizeInput === null || sizeInput === void 0 ? void 0 : sizeInput.addEventListener('change', (e) => {
    feedback.innerHTML = '';
});
//# sourceMappingURL=script.js.map
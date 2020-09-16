"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
require("@shared/infra/typeorm");
require("@shared/container");
var app = express_1.default();
/* Evita que sites que não sejam confiáveis acessem nosso site */
app.use(cors_1.default());
app.use(express_1.default.json());
/* Criaremos uma rota para saber os arquivos que fizemos upload */
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'erorr',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internet server error',
    });
});
app.listen(3333, function () {
    console.log('🚀 Server started on port 3333');
});

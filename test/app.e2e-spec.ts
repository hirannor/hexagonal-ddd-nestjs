import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { ProductModel } from '@adapter/web/rest/product/product.model';

describe('Product API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    process.env.MESSAGE_ADAPTER = 'noop';
    process.env.REPOSITORY_ADAPTER = 'inmemory';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates and retrieves a product', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/products')
      .send({
        id: 'd3d80970-e079-4054-8a03-638503576b57',
        name: 'Coffee Mug',
      })
      .expect(201)
      .expect(({ body }: { body: ProductModel }) => {
        expect(body.name).toBe('Coffee Mug');
      });

    const createdProduct = createResponse.body as ProductModel;

    await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(({ body }: { body: ProductModel[] }) => {
        expect(body).toEqual([createdProduct]);
      });

    await request(app.getHttpServer())
      .get(`/products/${createdProduct.id}`)
      .expect(200)
      .expect(({ body }: { body: ProductModel }) => {
        expect(body).toEqual(createdProduct);
      });
  });
});

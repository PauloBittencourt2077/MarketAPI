import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

const mockProduct = {id: "1", name:"product", category: "category", description: "description" , price: 10, quantity: 10};
const mockedProductArray  = [
  new ProductEntity ({id: "1", name:"product", category: "category", description: "description" , price: 10, quantity: 10}),
  new ProductEntity ({id: "1", name:"product", category: "category", description: "description" , price: 10, quantity: 8})
]

describe('ProductsService', () => {
  let productService: ProductsService;
  let productRepository : Repository<ProductEntity>


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
        provide: getRepositoryToken(ProductEntity),
        useValue: {
          create: jest.fn().mockResolvedValue(mockProduct),
          save: jest.fn().mockResolvedValue(mockProduct),
          find: jest.fn().mockResolvedValue([mockProduct]),
          findOneBy: jest.fn().mockResolvedValue(mockProduct),
          merge: jest.fn().mockResolvedValue(mockProduct),
          remove: jest.fn().mockResolvedValue(mockProduct),
        }
      }],
    }).compile();

    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity))
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const result = await productService.create(mockProduct);

      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await productService.findAll();

      expect(result).toEqual([mockProduct]);
      expect(productRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await productService.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const result = await productService.update('1', mockProduct);

      expect(result).toEqual(mockProduct);
      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(productRepository.merge).toHaveBeenCalledWith(mockProduct, mockProduct);
      expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    });

    it('should return null if product is not found', async () => {
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      const result = await productService.update('nonExistent', mockProduct);

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const result = await productService.remove('1');

      expect(result).toEqual(mockProduct);
      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(productRepository.remove).toHaveBeenCalledWith(mockProduct);
    });

    it('should return null if product is not found', async () => {
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      const result = await productService.remove('nonExistent');

      expect(result).toBeNull();
    });
  });

  describe('updateQuantity', () => {
    it('should update product quantity', async () => {
      const dto = 2;

      jest.spyOn(productRepository, 'save').mockResolvedValue(mockedProductArray[1]);

      const result = await productService.updateQuantity('1', dto);

      expect(result).toEqual(mockedProductArray[1]);
      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(productRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if requested quantity exceeds stock', async () => {
      const dto = 11;

      await expect(productService.updateQuantity('1', dto)).rejects.toThrow(BadRequestException);
    });


    it('should return null if product is not found', async () => {
      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      const result = await productService.updateQuantity('nonexistent', 2);
      
      expect(result).toBeNull();
    });
  });

});

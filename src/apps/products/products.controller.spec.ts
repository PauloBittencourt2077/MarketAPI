import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

const mockProduct = {id: "1", name:"product", category: "category", description: "description" , price: 10, quantity: 10}

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: {
            create:jest.fn().mockResolvedValue(mockProduct),
            findAll :jest.fn().mockResolvedValue([mockProduct]),
            findOne:jest.fn().mockResolvedValue(mockProduct),
            update:jest.fn().mockResolvedValue(mockProduct),
            remove:jest.fn().mockResolvedValue(mockProduct),
        }
      }],
    }).compile();


    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('create', () => {
    it('should return a create Product Entity sucessfully', async () => {

      const result = await productController.create(mockProduct);

      expect(result).toEqual(mockProduct);
      expect(productService.create).toHaveBeenCalled();
      expect(productService.create).toHaveBeenCalledWith(mockProduct);
    })
  })

  describe('findAll', () => {
    it('should return an array of products', async () => {

      const result = await productController.findAll();

      expect(result).toEqual([mockProduct]);
      expect(productService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await productController.findOne('1');

      expect(result).toEqual(mockProduct);
      expect(productService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productService, 'findOne').mockResolvedValue(null);

      await expect(productController.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const result = await productController.update('1', mockProduct);

      expect(result).toEqual({ ...mockProduct, ...mockProduct });
      expect(productService.update).toHaveBeenCalledWith('1', mockProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productService, 'update').mockResolvedValue(null);

      await expect(productController.update('nonexistent', mockProduct)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await expect(productController.remove('1')).resolves.toBeUndefined();

      expect(productService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productService, 'remove').mockResolvedValue(null);

      await expect(productController.remove('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

    describe('updateQuantity', () => {
    it('should update a product quantity', async () => {
      const result = await productController.updateQuantity('1', mockProduct);

      expect(result).toEqual({ ...mockProduct, ...mockProduct });
      expect(productService.update).toHaveBeenCalledWith('1', mockProduct);
    });

    it('should throw NotFoundException if product is not found', async () => {
      jest.spyOn(productService, 'update').mockResolvedValue(null);

      await expect(productController.updateQuantity('nonexistent', mockProduct)).rejects.toThrow(NotFoundException);
    });
  });
});

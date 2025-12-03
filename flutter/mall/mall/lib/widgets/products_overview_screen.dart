import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../providers/cart_provider.dart';
import '../screens/cart_screen.dart';
import 'product_item.dart';

class ProductsOverviewScreen extends StatelessWidget {
  ProductsOverviewScreen({super.key});

  // 模拟假数据
  final List<Product> loadedProducts = [
    Product(
      id: 'p1',
      title: '红色运动鞋',
      description: '这是一双非常舒适的红色运动鞋，适合跑步。',
      price: 29.99,
      imageUrl: 'https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_1280.png',
    ),
    Product(
      id: 'p2',
      title: '男士衬衫',
      description: '商务休闲两用，纯棉材质。',
      price: 59.99,
      imageUrl: 'https://cdn.pixabay.com/photo/2014/08/26/21/48/shirts-428600_1280.jpg',
    ),
    Product(
      id: 'p3',
      title: '黄色围巾',
      description: '温暖过冬，时尚百搭。',
      price: 19.99,
      imageUrl: 'https://cdn.pixabay.com/photo/2015/01/16/15/01/scarf-601429_1280.jpg',
    ),
    Product(
      id: 'p4',
      title: '平底锅',
      description: '不粘锅，厨房必备神器。',
      price: 49.99,
      imageUrl: 'https://cdn.pixabay.com/photo/2016/01/18/17/57/pancakes-1147313_1280.jpg',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter 商城'),
        actions: [
          // 购物车图标，带角标
          Consumer<CartProvider>(
            builder: (_, cart, ch) => Badge(
              label: Text(cart.itemCount.toString()),
              child: ch,
            ),
            child: IconButton(
              icon: const Icon(Icons.shopping_cart),
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(builder: (ctx) => const CartScreen()));
              },
            ),
          ),
          const SizedBox(width: 20),
        ],
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(10.0),
        itemCount: loadedProducts.length,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2, // 一行显示两个
          childAspectRatio: 3 / 2,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemBuilder: (ctx, i) => ProductItem(product: loadedProducts[i]),
      ),
    );
  }
}

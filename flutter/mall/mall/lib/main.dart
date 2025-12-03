import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/cart_provider.dart';
import 'models/product.dart';
import 'screens/product_detail_screen.dart';
import 'screens/cart_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // 使用 MultiProvider 注入状态
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => CartProvider()),
      ],
      child: MaterialApp(
        title: 'Flutter Mall',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.blue).copyWith(secondary: Colors.deepOrange),
          fontFamily: 'Lato',
        ),
        home:  ProductsOverviewScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

class ProductsOverviewScreen extends StatelessWidget {
  ProductsOverviewScreen({super.key});

  // 模拟假数据
  final List<Product> loadedProducts =  [
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

// 单个商品卡片组件
class ProductItem extends StatelessWidget {
  final Product product;

  const ProductItem({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(10),
      child: GridTile(
        footer: GridTileBar(
          backgroundColor: Colors.black87,
          leading: IconButton(
            icon: const Icon(Icons.favorite_border),
            color: Theme.of(context).colorScheme.secondary,
            onPressed: () {}, // 收藏功能占位
          ),
          title: Text(
            product.title,
            textAlign: TextAlign.center,
          ),
          trailing: IconButton(
            icon: const Icon(Icons.shopping_cart),
            color: Theme.of(context).colorScheme.secondary,
            onPressed: () {
              Provider.of<CartProvider>(context, listen: false).addItem(
                product.id,
                product.price,
                product.title,
              );
              ScaffoldMessenger.of(context).hideCurrentSnackBar();
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('已添加到购物车!'), duration: Duration(seconds: 1)),
              );
            },
          ),
        ),
        child: GestureDetector(
          onTap: () {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (ctx) => ProductDetailScreen(product: product),
              ),
            );
          },
          child: Image.network(
            product.imageUrl,
            fit: BoxFit.cover,
            loadingBuilder: (context, child, loadingProgress) {
              if (loadingProgress == null) return child;
              return const Center(child: CircularProgressIndicator());
            },
            errorBuilder: (context, error, stackTrace) => const Center(child: Icon(Icons.error)),
          ),
        ),
      ),
    );
  }
}
<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
    $product = $_POST['product'] ?? '';
    $quantity = $_POST['quantity'] ?? '';
    $price = $_POST['price'] ?? '';

    $orderData = date('Y-m-d H:i:s') . " | Product: $product | Quantity: $quantity | Price: $price\n";
    file_put_contents('orders_log.txt',$orderData,FILE_APPEND);
    echo "Order logged!";
}else{
    echo "Invalid request!";
}
?>
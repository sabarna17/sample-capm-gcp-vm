namespace my.bookshop;
entity Books {
  key ID : Integer;
  title  : String(111);
  descr  : String(1111);
  stock  : Integer;
  price  : Integer;
}
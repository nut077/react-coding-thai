import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from '@react-pdf/renderer';

import { useSelector } from 'react-redux';
import {
  DataTableCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
} from '@david.kucsai/react-pdf-table';

Font.register({
  family: 'Sarabun',
  fonts: [{ src: './fonts/Sarabun-Regular.ttf' }],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Sarabun',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});

// Create Document Component
const PdfReport = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  return (
    <PDFViewer className="container-fluid mt-3" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Image style={{ width: 50 }} src="./logo192.png" />
          </View>
          <View>
            <Text style={styles.title}>รายงานการสั่งซื้อสินค้า</Text>
          </View>
          <Table data={cart}>
            <TableHeader textAlign="center">
              <TableCell weighting={0.15}>Product Id</TableCell>
              <TableCell weighting={0.5}>Product Name</TableCell>
              <TableCell weighting={0.25}>Price</TableCell>
              <TableCell weighting={0.25}>No.</TableCell>
              <TableCell weighting={0.25}>Total</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                weighting={0.15}
                style={{ textAlign: 'center' }}
                getContent={(r) => r.id}
              />
              <DataTableCell weighting={0.5} getContent={(r) => r.name} />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: 'center' }}
                getContent={(r) => r.price}
              />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: 'center' }}
                getContent={(r) => r.qty}
              />
              <DataTableCell
                weighting={0.25}
                style={{ textAlign: 'center' }}
                getContent={(r) => r.qty * r.price}
              />
            </TableBody>
          </Table>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfReport;

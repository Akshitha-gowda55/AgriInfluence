"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = generateInvoice;
function generateInvoice(invoice) {
    const itemsHtml = invoice.items
        .map((item) => `
      <tr>
        <td style="padding:8px; border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px; border:1px solid #ddd;">${item.quantity}</td>
        <td style="padding:8px; border:1px solid #ddd;">₹${item.price.toFixed(2)}</td>
        <td style="padding:8px; border:1px solid #ddd;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `)
        .join('');
    return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #222;">
        <h1>AgriInfluence Invoice</h1>
        <p><strong>Order ID:</strong> ${invoice.orderId}</p>
        <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
        <p><strong>Customer:</strong> ${invoice.customerName}</p>
        <p><strong>Email:</strong> ${invoice.customerEmail}</p>

        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <thead>
            <tr>
              <th style="padding:8px; border:1px solid #ddd; text-align:left;">Product</th>
              <th style="padding:8px; border:1px solid #ddd; text-align:left;">Qty</th>
              <th style="padding:8px; border:1px solid #ddd; text-align:left;">Price</th>
              <th style="padding:8px; border:1px solid #ddd; text-align:left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top: 20px;">
          <p><strong>Subtotal:</strong> ₹${invoice.subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹${invoice.tax.toFixed(2)}</p>
          <p><strong>Shipping:</strong> ₹${invoice.shipping.toFixed(2)}</p>
          <p style="font-size: 18px;"><strong>Grand Total:</strong> ₹${invoice.total.toFixed(2)}</p>
        </div>
      </body>
    </html>
  `;
}
//# sourceMappingURL=invoice.js.map
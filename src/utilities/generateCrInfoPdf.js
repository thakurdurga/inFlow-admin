import jsPDF from "jspdf";

export const generateCrInPdf = (company) => {
  const doc = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
  doc.setFont("Amiri-Regular");

  doc.setFontSize(22);
  doc.setTextColor(90, 90, 90);
  let y = 40;
  let x = 30;
  doc.text(x, y, `Company info`);
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);

  y += 15;
  doc.line(x, y, 430, y);
  doc.setFontSize(13);
  doc.setTextColor(100, 100, 100);

  y += 15;
  doc.text(
    x,
    y,
    `Corporate Registration Name: ${company?.company_name || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Corporate Registration Number: ${
      company?.company_registration_number || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Corporate Registration Entity Number: ${
      company?.extended_cr_info?.crMainEntityNumber || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Corporate Registration Main Number: ${
      company?.extended_cr_info?.crMainNumber || "-"
    }`
  );

  y += 15;
  doc.text(x, y, `Issue Date: ${company?.extended_cr_info?.issueDate || "-"}`);

  y += 15;
  doc.text(
    x,
    y,
    `IsExpiry Date: ${company?.extended_cr_info?.expiryDate || "-"}`
  );

  y += 15;
  doc.text(x, 160, `Business Type: ${company?.business_type || "-"}`);

  y += 15;
  doc.text(x, y, `Status: ${company?.extended_cr_info?.status?.name || "-"}`);

  y += 15;
  doc.text(
    x,
    y,
    `Status (English): ${company?.extended_cr_info?.status?.nameEn || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Location: ${company?.extended_cr_info?.location?.name || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Description: ${company?.extended_cr_info?.activities?.description || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Is active: ${
      company?.extended_cr_info?.status?.nameEn === "Active" ? "Yes" : "No"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Is eCommerce: ${company?.extended_cr_info?.isEcommerce ? "Yes" : "No"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Cancellation: ${company?.extended_cr_info?.cancellation || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Period: ${company?.extended_cr_info?.company?.period || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Start Date: ${company?.extended_cr_info?.company?.startDate || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `End Date: ${company?.extended_cr_info?.company?.endDate || "-"}`
  );

  y += 15;
  if (!company?.extended_cr_info?.fiscalYear) {
    doc.text(x, y, `Fiscal year: -`);
  } else {
    doc.text(x, y, `Fiscal year:`);
    y += 15;

    doc.text(60, y, `Day: ${company?.extended_cr_info?.fiscalYear?.day || ""}`);
    y += 15;

    doc.text(
      60,
      y,
      `Month: ${company?.extended_cr_info?.fiscalYear?.month || ""}`
    );

    y += 15;
    doc.text(
      60,
      y,
      `${company?.extended_cr_info?.fiscalYear?.calendarType?.name || ""}`
    );
  }

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setDrawColor(60, 140, 188);
  doc.setLineWidth(2);
  doc.line(x, y, 430, y);

  y += 25;
  doc.setFontSize(22);
  doc.text(x, y, `Address`);

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setFontSize(13);
  doc.text(
    x,
    y,
    `Website: ${company?.extended_cr_info?.address?.general?.website || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Address: ${company?.extended_cr_info?.address?.general?.address || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Email: ${company?.extended_cr_info?.address?.general?.email || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Fax 1: ${company?.extended_cr_info?.address?.general?.fax1 || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Fax 2: ${company?.extended_cr_info?.address?.general?.fax2 || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Telephone 1: ${
      company?.extended_cr_info?.address?.general?.telephone1 || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Telephone 2: ${
      company?.extended_cr_info?.address?.general?.telephone2 || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Postal Box 1: ${
      company?.extended_cr_info?.address?.general?.postalBox1 || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Postal Box 2: ${
      company?.extended_cr_info?.address?.general?.postalBox2 || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Building Number: ${
      company?.extended_cr_info?.address?.national?.buildingNumber || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Additional Number: ${
      company?.extended_cr_info?.address?.national?.additionalNumber || "-"
    }`
  );

  y = x;
  doc.addPage();

  doc.text(
    x,
    y,
    `Street Name: ${
      company?.extended_cr_info?.address?.national?.streetName || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `City: ${company?.extended_cr_info?.address?.national?.city || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Zip Code: ${company?.extended_cr_info?.address?.national?.zipcode || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Unit Number: ${
      company?.extended_cr_info?.address?.national?.unitNumber || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `UnDistrict: ${
      company?.extended_cr_info?.address?.national?.districtName || "-"
    }`
  );

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setDrawColor(60, 140, 188);
  doc.setLineWidth(2);
  doc.line(x, y, 430, y);

  y += 25;
  doc.setFontSize(22);
  doc.text(x, y, `Owners`);

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  doc.setFontSize(13);
  company?.extended_cr_info?.parties &&
    company?.extended_cr_info?.parties.length > 0 &&
    company?.extended_cr_info?.parties?.map((user) => {
      if (
        user?.relation?.name === "رئيس مجلس الادارة" ||
        user?.relation?.name === "مدير"
      ) {
        y += 15;
        doc.text(40, y, `# Name: ${user?.name || "-"}`);

        y += 15;
        doc.text(47, y, `NIN/Iqama: ${user?.identity?.id || "-"}`);

        y += 15;
        doc.text(47, y, `Address: ${user?.address || "-"}`);

        y += 15;
        doc.text(47, y, `Date Of Birth: ${user?.birthDate || "-"}`);

        y += 15;
        doc.text(47, y, `Shares Count: ${user?.sharesCount || "-"}`);

        y += 15;
        doc.text(47, y, `Gross: ${user?.relation?.name || "-"}`);

        y += 15;
        doc.text(47, y, `Relation: ${user?.relation?.name || "-"}`);

        y += 15;
        doc.text(47, y, `Nationality: ${user?.nationality?.name || "-"}`);
      }
    });

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setDrawColor(60, 140, 188);
  doc.setLineWidth(2);
  doc.line(x, y, 430, y);

  y += 25;
  doc.setFontSize(22);
  doc.text(x, y, `Capital`);

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setFontSize(13);
  doc.text(
    x,
    y,
    `Price per share: ${
      company?.extended_cr_info?.capital?.share?.sharePrice || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Number of shares: ${
      company?.extended_cr_info?.capital?.share?.sharesCount || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Paid amount: ${company?.extended_cr_info?.capital?.paidAmount || "-"}`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Announced amount: ${
      company?.extended_cr_info?.capital?.announcedAmount || "-"
    }`
  );

  y += 15;
  doc.text(
    x,
    y,
    `Subscribed amount: ${
      company?.extended_cr_info?.capital?.subscribedAmount || "-"
    }`
  );

  doc.addPage();

  y = x;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  y += 15;
  doc.setDrawColor(60, 140, 188);
  doc.setLineWidth(2);
  doc.line(x, y, 430, y);

  y += 25;
  doc.setFontSize(22);
  doc.text(x, y, `ISIC`);

  y += 15;
  doc.setDrawColor(150, 150, 155);
  doc.setLineWidth(0.01);
  doc.line(x, y, 430, y);

  doc.setFontSize(13);
  y += 10;

  company?.extended_cr_info?.activities?.isic &&
    company?.extended_cr_info?.activities?.isic?.length > 0 &&
    company?.extended_cr_info?.activities?.isic?.map((item) => {
      y += 15;
      doc.text(40, y, `# Name: ${item?.name}`);

      y += 15;
      doc.text(47, y, `Name (English): ${item?.nameEn}`);
      y += 10;
    });

  doc.save("cr-info.pdf");
};

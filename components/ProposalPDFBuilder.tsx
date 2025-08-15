"use client";
import React, { useCallback, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
  Font,
} from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import PDFSvgLogo from "@/components/PdfSvgLogo";
import { Client, Estimate, Proposal } from "@/types";
import { ProposalItemsDetails } from "@/components/ProposalItemsDetailsContext";

const montserratSrc = "";
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
      fontWeight: 400,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    gap: 18,
    backgroundColor: "#FFF",
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  heading_logo: {
    flexDirection: "row",
    gap: "4px",
  },
  logo: {
    width: "42px",
    height: "42px",
  },
  vertical_line: {
    marginHorizontal: 5,
  },
  business_name: {
    fontSize: 11,
    // fontFamily: "Raleway",
    // fontWeight: "semibold",
    letterSpacing: 2,
  },
  business_name_view: {
    marginVertical: 4,
    flexDirection: "column",
    gap: 1.2,
    color: "#1F2E3F",
  },
  business_name_millwork: {
    color: "#855529",
  },
  issue_date_view: {
    fontSize: 10,
    flexDirection: "column",
    gap: 4,
  },
  project_details_view: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  project_detail_section_view: {
    flexDirection: "column",
    gap: 10,
  },
  project_detail_title_text: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 10,
    letterSpacing: 1.2,
  },
  details_view: {
    flexDirection: "column",
    gap: 2,
  },
  project_details_text: {
    fontFamily: "Open Sans",
    color: "#1F2E3F",
    fontSize: 8.5,
    fontWeight: 600,
  },
  item_list_view: {
    flexDirection: "column",
    gap: 12,
    marginTop: 10,
  },
  item_list_header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_list_header_text: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 10.5,
  },
  item_view: {
    flexDirection: "column",
    gap: 14,
  },
  item_name_price_view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item_name_text: {
    fontFamily: "Open Sans",
    color: "#1F2E3F",
    fontSize: 8.5,
    fontWeight: 600,
  },
  item_details_view: {
    flexDirection: "column",
    gap: 2,
  },
  item_detail_text: {
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: 8.5,
    color: "#787878",
  },
  total_due_view: {
    flexDirection: "column",
    gap: 14,
    marginTop: 70,
  },
  total_section_view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total_title_text: {
    color: "#192534",
    fontSize: 10,
  },
  approval_signature_section_view: {
    flexDirection: "column",
    gap: 20,
  },
  approval_text: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: 9.5,
    color: "#1F2E3F",
    marginTop: 40,
  },
  signature_section_view: {
    marginTop: 24,
    flexDirection: "column",
    gap: 36,
  },
  print_date_section: {
    flexDirection: "row",
    gap: 25,
  },
  line_label_view: {
    flexDirection: "column",
    gap: 2,
  },
  signature_section_labels: {
    fontFamily: "Montserrat",
    fontWeight: 400,
    color: "#1F2E3F",
    fontSize: 7,
  },
  disclaimer_text: {
    fontFamily: "Open Sans",
    color: "#1F2E3F",
    fontSize: 9,
    fontWeight: 600,
    alignSelf: "center",
  },
});

const items = [
  "Dresser",
  "Pantry",
  "Shelves",
  "Vanity",
  "Bookshelf",
  "Bedframe",
  "Media Console",
];

interface ProposalPDFBuilderProps {
  proposal: Proposal;
  proposalItems: Estimate[];
  client: Client;
  proposalItemsDetails: ProposalItemsDetails;
}

// Create Document Component
export default function ProposalPDFBuilder({
  proposal,
  proposalItems,
  client,
  proposalItemsDetails,
}: ProposalPDFBuilderProps) {
  // console.log("proposalItemsDetails: ", proposalItemsDetails);
  const loadFonts = useCallback(async () => {
    await Promise.all([
      Font.load({ fontFamily: "Open Sans", fontWeight: 400 }),
      Font.load({ fontFamily: "Open Sans", fontWeight: 600 }),
      Font.load({ fontFamily: "Montserrat", fontWeight: 400 }),
    ]);
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  useEffect(() => {
    // This will run every time proposalItemsDetails changes
    // console.log("Proposal items details changed", proposalItemsDetails);
  }, [proposalItemsDetails]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.heading_logo}>
            <View style={styles.logo}>
              <PDFSvgLogo />
            </View>
            <Svg height="44" width="1.5" style={styles.vertical_line}>
              <Line
                x1="0"
                y1="0"
                x2="0"
                y2="44"
                strokeWidth={2}
                stroke="#855529"
              />
            </Svg>
            <View style={styles.business_name_view}>
              <Text style={styles.business_name}>Pacific</Text>
              <Text style={styles.business_name}>Fine</Text>
              <Text
                style={[styles.business_name, styles.business_name_millwork]}
              >
                Millwork
              </Text>
            </View>
          </View>

          <View style={styles.issue_date_view}>
            <Text>Issue date</Text>
            <Text>10/30/2024</Text>
          </View>
        </View>
        <Svg width={500} height={6.5}>
          <Line
            x1="0"
            y1="0"
            x2="500"
            y2="0"
            strokeWidth={6.5}
            stroke="#1F2E3F"
            strokeOpacity={0.8}
          />
        </Svg>
        <View style={styles.project_details_view}>
          <View style={styles.project_detail_section_view}>
            <Svg width={160} height={2}>
              <Line
                x1="0"
                y1="0"
                x2="160"
                y2="0"
                strokeWidth={2}
                stroke="#E7E7E7"
              />
            </Svg>
            <Text style={styles.project_detail_title_text}>RECEPIENT</Text>
            <View style={[styles.details_view, styles.project_details_text]}>
              <Text>{client.company_name ?? client.primary_contact_name}</Text>
              <Text>{client.email_address}</Text>
              <Text>
                ({client.phone_number.slice(0, 3)}){" "}
                {client.phone_number.slice(3, 6)}-{client.phone_number.slice(6)}
              </Text>
              {/* <Text>{client.}</Text> */}
            </View>
          </View>
          <View style={styles.project_detail_section_view}>
            <Svg width={160} height={2}>
              <Line
                x1="0"
                y1="0"
                x2="160"
                y2="0"
                strokeWidth={2}
                stroke="#E7E7E7"
              />
            </Svg>
            <Text style={styles.project_detail_title_text}>PROJECT</Text>
            <View style={[styles.details_view, styles.project_details_text]}>
              <Text>{proposal.project_name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.item_list_view} wrap={false}>
          <LightGrayLine />
          <View style={styles.item_list_header}>
            <Text style={styles.item_list_header_text}>ITEM</Text>
            <Text style={styles.item_list_header_text}>PRICE</Text>
          </View>
          <LightGrayLine />
          {proposalItems.map((item, index) => (
            <View key={item.item_name} style={styles.item_view} wrap={false}>
              <View style={styles.item_name_price_view}>
                <Text style={styles.item_name_text}>
                  {item.room} - {item.item_name}
                </Text>
                <Text style={styles.item_name_text}>
                  $
                  {item.total_cost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
              <View style={styles.item_details_view}>
                {item.id &&
                proposalItemsDetails &&
                proposalItemsDetails[item.id]
                  ? proposalItemsDetails[item.id].map((proposalItemDetail) => (
                      <Text
                        key={item.item_name}
                        style={styles.item_detail_text}
                      >
                        {proposalItemDetail.description}
                      </Text>
                    ))
                  : null}
              </View>
              <LightGrayLine />
            </View>
          ))}
        </View>
        <View style={styles.total_due_view} wrap={false}>
          <LightGrayLine />
          <View style={styles.total_section_view}>
            <Text style={styles.total_title_text}>Total Bid Price</Text>
            <Text style={styles.total_title_text}>
              $
              {proposal.total_cost.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <LightGrayLine />
        </View>
        <View style={styles.approval_signature_section_view} wrap={false}>
          <Text style={styles.approval_text}>
            Please sign and return if approved
          </Text>
          <View style={styles.signature_section_view}>
            <View style={styles.print_date_section}>
              <View style={styles.line_label_view}>
                <Svg width={220} height={1.5}>
                  <Line
                    x1="0"
                    y1="0"
                    x2="220"
                    y2="0"
                    strokeWidth={1.5}
                    stroke="#1F2E3F"
                  />
                </Svg>
                <Text style={styles.signature_section_labels}>Print Name</Text>
              </View>
              <View style={styles.line_label_view}>
                <Svg width={100} height={1.5}>
                  <Line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    strokeWidth={1.5}
                    stroke="#1F2E3F"
                  />
                </Svg>
                <Text style={styles.signature_section_labels}>Date</Text>
              </View>
            </View>
            <View style={styles.line_label_view}>
              <Svg width={220} height={1.5}>
                <Line
                  x1="0"
                  y1="0"
                  x2="220"
                  y2="0"
                  strokeWidth={1.5}
                  stroke="#1F2E3F"
                />
              </Svg>
              <Text style={styles.signature_section_labels}>Signature</Text>
            </View>
          </View>
        </View>
        <Text style={styles.disclaimer_text}>
          THIS PROPOSAL IS VALID FOR 30 DAYS
        </Text>
      </Page>
    </Document>
  );
}

const LightGrayLine = () => (
  <Svg width={500} height={3.5}>
    <Line x1="0" y1="0" x2="500" y2="0" strokeWidth={3.5} stroke="#E7E7E7" />
  </Svg>
);

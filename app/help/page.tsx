import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Help Center - EDNA",
  description: "Find answers to frequently asked questions and get help with using EDNA.",
}

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create my first post?",
      answer:
        "To create your first post, click the 'Create' button in the navigation menu. You can add images, write your caption, select categories, and add tags to make your post discoverable.",
    },
    {
      question: "How do I follow other users?",
      answer:
        "You can follow other users by visiting their profile page and clicking the 'Follow' button. You can find users through the explore page, search function, or by browsing posts.",
    },
    {
      question: "Can I edit my posts after publishing?",
      answer:
        "Yes, you can edit your posts after publishing. Go to your profile, find the post you want to edit, and click the edit button. You can modify the caption, tags, and categories.",
    },
    {
      question: "How do I change my profile information?",
      answer:
        "To update your profile, go to Settings from your profile page. You can change your display name, bio, profile picture, and other personal information.",
    },
    {
      question: "What types of content can I share?",
      answer:
        "You can share fashion inspiration, beauty tips, lifestyle content, and personal experiences. Make sure your content follows our community guidelines and is appropriate for all audiences.",
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        "If you see content that violates our community guidelines, you can report it by clicking the three dots menu on any post and selecting 'Report'. Our team will review the content promptly.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600">Find answers to common questions and get help with using EDNA</p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                New to EDNA? Learn the basics of creating posts and building your profile.
              </p>
              <Button variant="outline">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your account, privacy settings, and notification preferences.</p>
              <Link href="/settings">
                <Button variant="outline">Go to Settings</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Learn about our community standards and how to create a positive environment.
              </p>
              <Button variant="outline">Read Guidelines</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl mb-4">Still Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white">
                Contact Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

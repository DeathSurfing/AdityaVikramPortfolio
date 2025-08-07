'use client';

import { motion } from 'framer-motion';
import LenisSmoothScroll from '@/components/ui/lenis-smooth-scroll';
import { Azeret_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Calendar, Clock, ArrowRight, Tag, PenTool, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { blogPosts, getFeaturedPosts, getRegularPosts } from '@/lib/blog-data';

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-azeret-mono',
});

export default function BlogPage() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.23, 1, 0.32, 1] as any,
      },
    }),
  };

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  const hasPosts = blogPosts.length > 0;

  return (
    <LenisSmoothScroll
      options={{
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        mouseMultiplier: 0.8,
      }}
    >
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className={cn(
                "text-6xl md:text-8xl font-bold text-foreground mb-8",
                azeretMono.className
              )}
            >
              Blog
            </motion.h1>
            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {hasPosts ? 
                "Technical insights, project deep-dives, and lessons learned from building software at scale" :
                "Coming soon: Technical insights, project breakdowns, and lessons from real-world development"
              }
            </motion.p>
            
            {!hasPosts && (
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                className="flex items-center justify-center gap-2 text-muted-foreground"
              >
                <PenTool className="h-5 w-5" />
                <span className="text-lg">Currently crafting my first posts...</span>
              </motion.div>
            )}
          </div>
        </section>

        {hasPosts ? (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                  >
                    Featured Articles
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.2,
                          ease: [0.23, 1, 0.32, 1] as any
                        }}
                        className="group cursor-pointer"
                      >
                        <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                            <span>Read More</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* All Posts */}
            {regularPosts.length > 0 && (
              <section className="py-20 px-4 bg-muted/10">
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                  >
                    All Articles
                  </motion.h2>

                  <div className="space-y-6">
                    {regularPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1,
                          ease: [0.23, 1, 0.32, 1] as any
                        }}
                        className="group cursor-pointer"
                      >
                        <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 group-hover:shadow-md">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>

                              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                              </h3>

                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {post.excerpt}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                              <span className="text-sm">Read</span>
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Empty State - Coming Soon Section */
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as any }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center mb-8">
                  <div className="p-6 rounded-full bg-primary/10 border border-primary/20">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Blog Coming Soon
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  I'm preparing to share technical insights, project deep-dives, and lessons learned 
                  from building real-world applications. Stay tuned for exciting content!
                </p>
              </motion.div>

              {/* Planned Topics */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] as any }}
                className="grid md:grid-cols-2 gap-6 mb-16"
              >
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-foreground mb-4">Upcoming Topics</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Building scalable payment systems
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      CNN implementation in Rust
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      University system optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Full-stack development insights
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-foreground mb-4">What to Expect</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Real project breakdowns
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Technical deep-dives
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Performance optimization tips
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      Lessons learned & best practices
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] as any }}
                className="text-center"
              >
                <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Get Notified</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Want to be the first to read my posts? Drop me a line and I'll notify you when the blog launches!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:jobs.aditya.vikram.mahendru@gmail.com?subject=Blog%20Launch%20Notification"
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      Notify Me
                    </a>
                    <a
                      href="/projects"
                      className="px-6 py-3 border border-border rounded-full font-medium hover:bg-accent transition-colors"
                    >
                      View Projects Instead
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </LenisSmoothScroll>
  );
}

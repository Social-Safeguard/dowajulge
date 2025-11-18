import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  LayoutDashboard, 
  Search, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  MessageSquare,
  BarChart3,
  AlertCircle,
  User,
  Bookmark,
  Share2,
  ChevronRight
} from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

interface Post {
  id: string;
  username: string;
  timestamp: string;
  content: string;
  tags: string[];
  platform: string;
  riskLevel: "고위험" | "중위험" | "저위험";
  status: "조치대기" | "진행중" | "완료";
  likes: number;
  comments: number;
  shares: number;
}

const mockPosts: Post[] = [
  {
    id: "1",
    username: "@user-1234",
    timestamp: "2024-01-15 14:32:00",
    content: "나무 힘들어서 이제 먼도 잘 못먹고 살다...",
    tags: ["#나무 보건", "#힘들어", "#이제 못 못 먹어"],
    platform: "X",
    riskLevel: "고위험",
    status: "조치대기",
    likes: 3,
    comments: 0,
    shares: 0
  },
  {
    id: "2",
    username: "@user-1234",
    timestamp: "2024-01-15 14:32:00",
    content: "나무 힘들어서 이제 먼도 잘 못먹고 살다...",
    tags: ["#나무 보건", "#힘들어", "#이제 못 못 먹어"],
    platform: "X",
    riskLevel: "고위험",
    status: "조치대기",
    likes: 3,
    comments: 0,
    shares: 0
  }
];

const mockPersonPosts = [
  {
    id: "1",
    riskLevel: "고위험" as const,
    content: "나무 힘들어서 이제 먼도 잘 못먹고 살다...",
    likes: 4
  },
  {
    id: "2",
    riskLevel: "고위험" as const,
    content: "더 이상 버틸 수가 없어, 이 고통에서 벗어나고 싶다",
    likes: 4
  },
  {
    id: "3",
    riskLevel: "중위험" as const,
    content: "유족 상이 의미있게 느껴져. 여름에도 창고 사건 많이 있어",
    likes: 4
  },
  {
    id: "4",
    riskLevel: "고위험" as const,
    content: "나무 힘들어서 이제 먼도 잘 못먹고 살다...",
    likes: 4
  },
  {
    id: "5",
    riskLevel: "고위험" as const,
    content: "더 이상 버틸 수가 없어, 이 고통에서 벗어나고 싶다",
    likes: 4
  }
];

export default function Home() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(true);
  const [activeTab, setActiveTab] = useState("고위험");

  const getRiskColor = (level: string) => {
    switch(level) {
      case "고위험": return "bg-red-50 text-red-600 border-red-200";
      case "중위험": return "bg-orange-50 text-orange-600 border-orange-200";
      case "저위험": return "bg-blue-50 text-blue-600 border-blue-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* 좌측 사이드바 */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded flex items-center justify-center text-background font-bold">
              ✦
            </div>
            <span className="text-xl font-bold">{APP_TITLE}</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 bg-accent">
              <LayoutDashboard className="w-5 h-5" />
              대시보드
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Search className="w-5 h-5" />
              탐색
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="w-5 h-5" />
              설정
            </Button>
          </div>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* 상단 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">AI 실시간 탐지 활성화</span>
              </div>
              <Button variant="outline" size="sm">
                발급 코드 확인
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">김민수</span>
              <Avatar className="w-8 h-8">
                <AvatarFallback>김</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">총 모니터링</div>
                <div className="text-3xl font-bold mb-1">2,848</div>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <TrendingDown className="w-3 h-3" />
                  <span>+12.5%</span>
                  <span className="text-muted-foreground">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">고위험 신호</div>
                <div className="text-3xl font-bold text-red-600 mb-1">23</div>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12.5%</span>
                  <span className="text-muted-foreground">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">중위험 신호</div>
                <div className="text-3xl font-bold mb-1">147</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8%</span>
                  <span className="text-muted-foreground">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">통보 사례</div>
                <div className="text-3xl font-bold mb-1">1,294</div>
                <div className="flex items-center gap-1 text-xs text-red-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+6.2%</span>
                  <span className="text-muted-foreground">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">대응률</div>
                <div className="text-3xl font-bold text-green-600 mb-1">94.2%</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+9.2%</span>
                  <span className="text-muted-foreground">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 실시간 모니터링 피드 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <h2 className="text-lg font-semibold">실시간 모니터링 피드</h2>
                </div>
                <span className="text-sm text-muted-foreground">국내 소셜 탐색</span>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="고위험" className="gap-2">
                    고위험 <Badge variant="secondary" className="bg-red-100 text-red-600">415</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="중위험" className="gap-2">
                    중위험 <Badge variant="secondary" className="bg-orange-100 text-orange-600">312</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="저위험" className="gap-2">
                    저위험 <Badge variant="secondary" className="bg-blue-100 text-blue-600">415</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-3">
                  {mockPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{post.username}</span>
                                <span className="text-xs text-muted-foreground">{post.platform}</span>
                                <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                            <Badge className={getRiskColor(post.riskLevel)}>
                              {post.riskLevel}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm mb-3">{post.content}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs text-blue-600 hover:underline cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" /> {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" /> 상세 분석
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" /> 분류보기
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" /> 유사 이력
                            </span>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            조치대기
                          </Button>
                        </div>

                        {/* 댓글 섹션 */}
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">김</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">김민수</span>
                                <span className="text-xs text-muted-foreground">상담사</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                이 게시물은 즉각적인 개입이 필요합니다. 자살 충동이 명확하게 드러나고 있습니다.
                              </p>
                              <div className="mt-2 pl-4 border-l-2 border-muted">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">박지영</span>
                                  <span className="text-xs text-muted-foreground">관리자</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  지역 유기서비스팀에 연락했습니다. 24시간 내 후속 조치 예정.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">김</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">김민수</span>
                                <span className="text-xs text-muted-foreground">상담사</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                이 게시물은 즉각적인 개입이 필요합니다. 자살 충동이 명확하게 드러나고 있습니다.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <input 
                              type="text" 
                              placeholder="메모 입력..."
                              className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Button size="sm" variant="outline">
                              답장
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 우측 인물 탐색 패널 */}
      {selectedPerson && (
        <aside className="w-96 border-l bg-card overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <h2 className="text-lg font-semibold">인물 탐색</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPerson(false)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* 사용자 정보 */}
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">@user-1234</h3>
                    <Badge className="bg-red-50 text-red-600 border-red-200">고위험</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">X · 2024-01-15 14:32:00</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="w-3 h-3" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="w-3 h-3" />
                      Threads
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-red-600 text-white hover:bg-red-700 hover:text-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 게시물 목록 */}
              <div className="space-y-3">
                {mockPersonPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getRiskColor(post.riskLevel)}>
                          {post.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
